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

import type { Firestore } from 'firebase/firestore'
import type { EditDetail } from '@/types/MainType'

export const useFirestore = () => {
  const $db = useNuxtApp().$db as Firestore

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
