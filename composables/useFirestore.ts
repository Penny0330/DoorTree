import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore'

export const useFirestore = () => {
  const { $db } = useNuxtApp()

  // create
  const setDocument = async (
    collection: string,
    id: string,
    data: object,
  ): Promise<void> => {
    try {
      const docRef = doc($db, collection, id)
      await setDoc(docRef, data)
    } catch (e) {
      console.error('Error setDocument: ', e)
    }
  }

  // get
  const getDocument = async (collection: string, id: string) => {
    try {
      const docRef = doc($db, collection, id)
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

  // update:
  const updateDocument = async (
    collectionName: string,
    docId: string,
    newItem: any,
  ): Promise<void> => {
    try {
      const docRef = doc($db, collectionName, docId)
      await updateDoc(docRef, newItem)
    } catch (error) {
      console.error('Error updateDocument:', error)
    }
  }

  // update: Array
  const updateDocumentArray = async (
    collectionName: string,
    docId: string,
    arrayField: string,
    newItem: any,
  ): Promise<void> => {
    try {
      const docRef = doc($db, collectionName, docId)
      await updateDoc(docRef, {
        [arrayField]: arrayUnion(newItem),
      })
    } catch (error) {
      console.error('Error updateDocumentArray:', error)
    }
  }

  // delete
  const deleteDocument = async (
    collectionName: string,
    docId: string,
  ): Promise<void> => {
    try {
      const docRef = doc($db, collectionName, docId)
      await deleteDoc(docRef)
    } catch (error) {
      console.error('Error deleteDocument:', error)
    }
  }

  // delete: Array
  const deleteDocumentArray = async (
    collectionName: string,
    docId: string,
    arrayField: string,
    newItem: any,
  ): Promise<void> => {
    try {
      const docRef = doc($db, collectionName, docId)
      await updateDoc(docRef, {
        [arrayField]: arrayRemove(newItem),
      })
    } catch (error) {
      console.error('Error deleteDocumentArray:', error)
    }
  }

  interface DocumentData {
    id: string
    [key: string]: any // TODO 待添加後，移至 /types
  }

  const getDocumentByLink = async (
    collectionName: string,
    link: string,
  ): Promise<DocumentData[]> => {
    try {
      const q = query(
        collection($db, collectionName),
        where('link', '==', link),
      )
      const querySnapshot = await getDocs(q)

      const results: DocumentData[] = []
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() })
      })

      return results
    } catch (error) {
      console.error('Error getDocumentByLink:', error)
      return []
    }
  }

  return {
    setDocument,
    getDocument,
    updateDocument,
    updateDocumentArray,
    deleteDocument,
    deleteDocumentArray,
    getDocumentByLink,
  }
}
