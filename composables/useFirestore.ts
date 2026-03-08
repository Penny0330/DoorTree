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
  type DocumentData,
  Firestore,
} from 'firebase/firestore'

import type { EditDetail } from '@/types/MainType'

export const useFirestore = () => {
  const $db = useNuxtApp().$db as Firestore

  // create
  const setDocument = async (
    collectionName: string,
    id: string,
    data: DocumentData,
  ): Promise<void> => {
    try {
      const docRef = doc($db, collectionName, id)
      await setDoc(docRef, data)
    } catch (e) {
      console.error('Error setDocument: ', e)
    }
  }

  // get
  const getDocument = async (
    collectionName: string,
    id: string,
  ): Promise<DocumentData | undefined> => {
    try {
      const docRef = doc($db, collectionName, id)
      const docSnapshot = await getDoc(docRef)

      if (!docSnapshot.exists()) {
        console.warn('No such document!')
        return undefined
      }

      return docSnapshot.data()
    } catch (error) {
      console.error('Error getDocument:', error)
    }
  }

  // update
  const updateDocument = async (
    collectionName: string,
    docId: string,
    newItem: DocumentData,
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
    newItem: unknown,
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
    newItem: unknown,
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

  const getDocumentByLink = async (
    collectionName: string,
    link: string,
  ): Promise<EditDetail[]> => {
    try {
      const q = query(
        collection($db, collectionName),
        where('link', '==', link),
      )
      const querySnapshot = await getDocs(q)
      const results: EditDetail[] = []
      querySnapshot.forEach((doc) => {
        results.push(doc.data() as EditDetail)
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
