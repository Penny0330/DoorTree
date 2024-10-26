import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore'

export const useFirestore = () => {
  const nuxtApp = useNuxtApp()

  const setDocument = async (collection: string, id: string, data: object) => {
    try {
      const docRef = doc(nuxtApp.$db, collection, id)
      await setDoc(docRef, data)
    } catch (e) {
      console.error('Error setDocument: ', e)
    }
  }

  const getDocument = async (collection: string, id: string) => {
    try {
      const docRef = doc(nuxtApp.$db, collection, id)
      const docSnapshot = await getDoc(docRef)

      if (!docSnapshot.exists()) {
        console.warn('No such document!')
        return
      }

      return docSnapshot.data()
    } catch (error) {
      console.error('Error getDocument:', error)
    }
  }

  const updateDocumentArray = async (
    collectionName: string,
    docId: string,
    arrayField: string,
    newItem: any,
  ): Promise<void> => {
    try {
      const docRef = doc(nuxtApp.$db, collectionName, docId)
      await updateDoc(docRef, {
        [arrayField]: arrayUnion(newItem),
      })
    } catch (error) {
      console.error('Error updateDocumentArray:', error)
    }
  }

  const deleteDocument = async (
    collectionName: string,
    docId: string,
  ): Promise<void> => {
    try {
      const docRef = doc(nuxtApp.$db, collectionName, docId)
      await deleteDoc(docRef)
    } catch (error) {
      console.error('Error deleteDocumentArray:', error)
    }
  }

  const deleteDocumentArray = async (
    collectionName: string,
    docId: string,
    arrayField: string,
    newItem: any,
  ): Promise<void> => {
    try {
      const docRef = doc(nuxtApp.$db, collectionName, docId)
      await updateDoc(docRef, {
        [arrayField]: arrayRemove(newItem),
      })
    } catch (error) {
      console.error('Error deleteDocumentArray:', error)
    }
  }

  return {
    setDocument,
    getDocument,
    updateDocumentArray,
    deleteDocument,
    deleteDocumentArray,
  }
}
