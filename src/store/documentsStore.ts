
import axios from 'axios'
import { createStore, createEvent, createEffect, sample } from 'effector'
import { DocumentClass } from './classes/documentClass'
import { Document } from './types'

export const getAllDocument = createEvent()



export const getDocumentsFx = createEffect<void, Document[], Error>(async () => {
	const req = await axios.get<Document[]>( `http://localhost:8000/api/document` )
	const docs = req.data;
	docs.sort(( a, b ) => {
			return new Date(b.create_date).getTime() - new Date(a.create_date).getTime()
	} )
	
	return docs
})



export const $documentStore = createStore<Document[]>([])
	.on( getDocumentsFx.done, ( _, data ) => data.result )

export let $documentClassStore = createStore<DocumentClass[]>([])

$documentClassStore = $documentStore.map( ( state ) => {
	let docClassArray: DocumentClass[] = [];
	state.forEach( doc => {
		let docClass = new DocumentClass(doc)
		docClassArray.push( docClass )
	} )
	return docClassArray
} )
	
sample({ source: getAllDocument, target: getDocumentsFx })
