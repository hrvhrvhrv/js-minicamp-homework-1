/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module heading/headingediting
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import ListBuilderCommand from './rebuildheadingcommand.js';

const defaultModelElement = 'paragraph';

/**
 * The headings engine feature. It handles switching between block formats &ndash; headings and paragraph.
 * This class represents the engine part of the heading feature. See also {@link module:heading/heading~Heading}.
 * It introduces `heading1`-`headingN` commands which allow to convert paragraphs into headings.
 *
 * @extends module:core/plugin~Plugin
 */
export default class ListBuilderEditing extends Plugin {
	/**
	 * @inheritDoc
	 */
	// constructor( editor ) {
	// 	super( editor );

	// 	editor.config.define( 'heading', {
	// 		options: [
	// 			{ model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
	// 			{ model: 'heading1', view: 'h2', title: 'Heading 1', class: 'ck-heading_heading1' },
	// 			{ model: 'heading2', view: 'h3', title: 'Heading 2', class: 'ck-heading_heading2' },
	// 			{ model: 'heading3', view: 'h4', title: 'Heading 3', class: 'ck-heading_heading3' }
	// 		]
	// 	} );
	// }

	/**
	 * @inheritDoc
	 */
	static get requires() {
		return [ Paragraph ];
	}

	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const options = editor.config.get( 'rebuild.options' );

		const modelElements = [];

		for ( const option of options ) {
			// Skip paragraph - it is defined in required Paragraph feature.
			if ( option.model !== defaultModelElement ) {
				// Schema.
				editor.model.schema.register( option.model, {
					inheritAllFrom: '$block'
				} );

				// editor.conversion.elementToElement( option );

				modelElements.push( option.model );
			}
		}

		// Register the heading command for this option.
		editor.commands.add( 'heading', new ListBuilderCommand( editor, modelElements ) );
	}

	/**
	 * @inheritDoc
	 */
	afterInit() {
		// If the enter command is added to the editor, alter its behavior.
		// Enter at the end of a heading element should create a paragraph.
		const editor = this.editor;
		const enterCommand = editor.commands.get( 'enter' );
		const options = editor.config.get( 'rebuild.options' );

		if ( enterCommand ) {
			this.listenTo( enterCommand, 'afterExecute', ( evt, data ) => {
				const positionParent = editor.model.document.selection.getFirstPosition().parent;
				const isHeading = options.some( option => positionParent.is( option.model ) );

				if ( isHeading && !positionParent.is( defaultModelElement ) && positionParent.childCount === 0 ) {
					data.writer.rename( positionParent, defaultModelElement );
				}
			} );
		}
	}
}