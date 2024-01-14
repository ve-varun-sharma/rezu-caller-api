import { firestoreDatabase } from "../config/firebase/firebase";

export async function createDemoCallDocument(
  callData: any
): Promise<any | void> {
  const collectionName = "Demo-Calls";

  try {
    const createdCallDoc = await firestoreDatabase
      .collection(collectionName)
      .add(callData);
    console.log("Added document with ID: ", createdCallDoc.id);

    // add the created id to the input data, and return the narrationSetting
    Object.assign(callData, { id: createdCallDoc.id });

    console.log("Created firestore document");
    return callData;
  } catch (error) {
    console.log("Error creating callData data:", error);
    throw error;
  }
}
