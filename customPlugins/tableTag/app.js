import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';

// custom Plugins
import ImageDropdown from "./customPlugins/PlaceholderDropdown/rebuildHeading.js";
import CreateList from "./customPlugins/createList/createList.js";


ClassicEditor
    .create( document.querySelector( '#editor'), {
        // The plugins are now passed directly to .create().
        plugins: [
            Essentials,
            UploadAdapter,
            Autoformat,
            Bold,
            Italic,
            BlockQuote,
            EasyImage,
            Heading,
            Image,
            ImageCaption,
            ImageStyle,
            ImageToolbar,
            ImageUpload,
            Link,
            List,
            MediaEmbed,
            Paragraph,
            Table,
            TableToolbar,
            ImageDropdown,
            CreateList
        ],
        rebuild: {
          options: [
            { model: "%%PARTNERLIST%%", title: "Partner List" },
            { model: "%%WEBSITE_SITE%%", title: "Website - Name" },
            { model: "%%WEBSITE_URL%%", title: "Website - URL" },
            {
              model:
                '<a href="mailto:affiliates@tfli.co.uk?subject=TFLI%20Affiliates%20">affiliates@tfli.co.uk</a>',
              title: "Email - Affiliates"
            },
            {
              model:
                '<a href="mailto:complaints@tfli.co.uk?subject=TFLI%20Complaints%20">complaints@tfli.co.uk</a>',
              title: "Email - Complaints"
            },
            {
              model:
                '<a href="mailto:fees@tfli.co.uk?subject=TFLI%20Fees%20">fees@tfli.co.uk</a>',
              title: "Email - Fees"
            }
          ]
        },

        // So is the rest of the default configuration.
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                "imageDropdown",
                "createList",
                'link',
                'bulletedList',
                'numberedList',
                'imageUpload',
                'blockQuote',
                'insertTable',
                'mediaEmbed',
                'undo',
                'redo'
            ]
        },
        image: {
            toolbar: [
                'imageStyle:full',
                'imageStyle:side',
                '|',
                'imageTextAlternative'
            ]
        },
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells'
            ]
        }
    } )
    .then( editor => {
        console.log( editor );
        window.CKEditor = editor;
    } )
    .catch( error => {
        console.error( error );
    } );