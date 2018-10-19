/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module heading/headingui
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Model from '@ckeditor/ckeditor5-ui/src/model';

import { createDropdown, addListToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import { getLocalizedOptions } from './rebuildutils.js';

import Collection from '@ckeditor/ckeditor5-utils/src/collection';

// import '../theme/heading.css';

/**
 * The headings UI feature. It introduces the `headings` dropdown.
 *
 * @extends module:core/plugin~Plugin
 */
export default class ListBuilderUI extends Plugin {
	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const t = editor.t;
		const options = getLocalizedOptions( editor );
		const defaultTitle = t( 'Placeholder Text' );
		const dropdownTooltip = t( 'Placeholder' );

		// Register UI component.
		editor.ui.componentFactory.add( 'imageDropdown', locale => {
			const titles = {};
			const itemDefinitions = new Collection();

			const headingCommand = editor.commands.get( 'heading' );
			// const paragraphCommand = editor.commands.get( 'paragraph' );

			const commands = [ headingCommand ];

			for ( const option of options ) {
				const def = {
					type: 'button',
					model: new Model( {
						label: option.title,
						withText: true
					} )
				};

				def.model.set( {
					commandName: 'heading',
					commandValue: option.model
				} );

				// Add the option to the collection.
				itemDefinitions.add( def );
				titles[ option.model ] = option.title;
			}

			const dropdownView = createDropdown( locale );
			addListToDropdown( dropdownView, itemDefinitions );

			dropdownView.buttonView.set( {
				isOn: false,
				withText: true,
				tooltip: dropdownTooltip
			} );

			dropdownView.extendTemplate( {
				attributes: {
					class: [
						'ck-heading-dropdown'
					]
				}
			} );

			dropdownView.buttonView.bind( 'label' ).to( headingCommand, 'value',  ( value, para ) => {
				const whichModel = value || para && 'paragraph';
				// If none of the commands is active, display default title.
				return titles[ whichModel ] ? titles[ whichModel ] : defaultTitle;
			} );

			// Execute command when an item from the dropdown is selected.
			this.listenTo( dropdownView, 'execute', evt => {
				console.log(evt);
				// doSomething(evt.source.commandValue ? { value: evt.source.commandValue } : undefined );
				doSomething(evt.source.commandValue);
				// editor.execute( evt.source.commandName, evt.source.commandValue ? { value: evt.source.commandValue } : undefined );
				// editor.execute( 'doSomething', evt.source.commandValue ? { value: evt.source.commandValue } : undefined);
				editor.editing.view.focus();
			} );

			function doSomething (val) {
				editor.model.change(writer => {
					const insertPosition = editor.model.document.selection.getFirstPosition();
					writer.insertText( (val + " "), insertPosition );			
				})
			  };

			return dropdownView;
		} );
	}
}