"use server";
import { Timestamp } from "firebase-admin/firestore";
import { db } from "../admin";



// Generate a random token and store in Firestore
export async function createApplication(data: any) {
  try {
    const applicationData = {
      ...data,
      createdAt: new Date().toISOString(), // Use string, not Timestamp
    };

    const docRef = db.collection("application").doc();
    await docRef.set(applicationData);

    // Return a plain object
    return { id: docRef.id, ...applicationData };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

// Get all applications with safe date conversion
export async function getAllApplications() {
  const snapshot = await db.collection('application').orderBy('createdAt', 'desc').get();
  return snapshot.docs.map((doc) => {
    const data = doc.data() ;
    // console.log(data)
    return {
      ...data,
       createdAt:
        data.createdAt instanceof Timestamp ?
         data.createdAt.toDate() 
         : new Date(data.createdAt),
    
    
    };
  });
}



// Get a single application by ID
export async function getApplicationById(id: string) {
  try {
    const docRef = db.collection("application").doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      throw new Error("Application not found");
    }

    const data = docSnap.data();

    return {
      id: docSnap.id,
      ...data,
      createdAt:
        data?.createdAt instanceof Timestamp
          ? data.createdAt.toDate()
          : new Date(data?.createdAt),
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}


