class InsertImage extends Plugin {
    init() {
        const editor = this.editor;


    }
}





editor.model.schema.extend( 'table', {
    allowAttributes: 'style'
} );

editor.conversion.for( 'upcast' ).add( upcastAttributeToAttribute( {
    view: {
        name: 'table',
        key: 'style',
        value: {
            'background-color': /[\s\S]+/
        }
    },
    model: {
        key: 'style',
        value: viewElement => viewElement.getStyle( 'background-color' )
    }
} ) );

editor.conversion.for( 'downcast' ).add( dispatcher => {
    dispatcher.on( 'attribute:style:table', ( evt, data, conversionApi ) => {
        const table = data.item;

        // The table from the model is mapped to the widget element: <figure>.
        const viewFigure = conversionApi.mapper.toViewElement( table );

        // A <table> is direct child of a <figure> but there might be other view (including UI) elments inside <figure>.
        const viewTable = [ ...viewFigure.getChildren() ].find( element => element.name === 'table' );

        // it should be consumed...

        // User view writer to change style of a view table.
        if ( data.attributeNewValue ) {
            conversionApi.writer.setStyle( 'background-color', data.attributeNewValue, viewTable );
        } else {
            conversionApi.writer.removeStyle( 'background-color', viewTable );
        }
    } );
} );

window.setTableStyle = function( style ) {
    const table = editor.model.document.selection.getFirstPosition().getAncestors().find( item => item.name == 'table' );

    editor.model.change( writer => {
        writer.setAttribute( 'style', style, table );
    } );
};