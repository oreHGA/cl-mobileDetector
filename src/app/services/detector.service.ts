import { Injectable } from '@angular/core';
const util = require('util');
const TrainingApi = require("azure-cognitiveservices-customvision-training");
const PredictionApi = require("azure-cognitiveservices-customvision-prediction");
const fs = require('fs');
const setTimeoutPromise = util.promisify(setTimeout);

const trainingKey = "<your training key>";
const predictionKey = "<your prediction key>";
const predictionResourceId = "<your prediction resource id>";
const sampleDataRoot = '../cognitive/imgs';

const endPoint = "https://southcentralus.api.cognitive.microsoft.com"

const publishIterationName = "classifyModel";

const trainer = new TrainingApi(trainingKey, endPoint);

@Injectable({
  providedIn: 'root'
})
export class DetectorService {

  constructor() { }

  (async () => {
    console.log("Creating project...");
    const sampleProject = await trainer.createProject("Pen Project")
    const penTag = await trainer.createTag(sampleProject.id, "Pen");
    console.log("Adding images...");
    let fileUploadPromises = [];

    const penDir = `${sampleDataRoot}/pens`;
    const penFiles = fs.readdirSync(penDir);
    penFiles.forEach(file => {
        fileUploadPromises.push(trainer.createImagesFromData(sampleProject.id, fs.readFileSync(`${penDir}/${file}`), { tagIds: [penTag.id] }));
});
await Promise.all(fileUploadPromises);
    console.log("Training...");
    let trainingIteration = await trainer.trainProject(sampleProject.id);

    // Wait for training to complete
    console.log("Training started...");
    while (trainingIteration.status == "Training") {
        console.log("Training status: " + trainingIteration.status);
        await setTimeoutPromise(1000, null);
        trainingIteration = await trainer.getIteration(sampleProject.id, trainingIteration.id)
    }
    console.log("Training status: " + trainingIteration.status);
    
    // Publish the iteration to the end point
    await trainer.publishIteration(sampleProject.id, trainingIteration.id, publishIterationName, predictionResourceId);
    const predictor = new PredictionApi(predictionKey, endPoint);
    const testFile = fs.readFileSync(`${sampleDataRoot}/test/Test.jpg`);

    const results = await predictor.classifyImage(sampleProject.id, publishIterationName, testFile);

    // Step 6. Show results
    console.log("Results:");
    results.predictions.forEach(predictedResult => {
console.log(`\t ${predictedResult.tagName}: ${(predictedResult.probability * 100.0).toFixed(2)}%`);
});
})();

}
