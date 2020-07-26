import React from 'react';

import './BlogCreateForm.scss';

// Import TinyMCE
import { Editor, IAllProps } from '@tinymce/tinymce-react';

interface BCFProps {

}

interface BCFState {
    content: string;
}

export default class BlogCreateForm extends React.Component<BCFProps, BCFState> {

    constructor(props: BCFProps) {
        super(props);

        this.state = { content: ''};
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }

    handleEditorChange = (content: string, editor: Editor) => {
        this.setState({content});
    }
    

    render() {
        return (
            <div>
                <Editor
                    value={this.state.content}
                    apiKey="o4g5kb8cmig71uhnkjb5kn5r540lg89kn646mvrzish0s4j0"
                    init={{
                        menu:  {
                            file: { title: 'File', items: 'newdocument restoredraft | preview | print ' },
                            edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall | searchreplace' },
                            view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen' },
                            insert: { title: 'Insert', items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
                            format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align | forecolor backcolor | removeformat' },
                            tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | code wordcount' },
                            table: { title: 'Table', items: 'inserttable | cell row column | tableprops deletetable' },
                            help: { title: 'Help', items: 'help' }
                          },
                        plugins: [
                            'advlist autolink link image lists charmap print preview hr anchor pagebreak',
                            'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                            'table emoticons template paste help imagetools'
                        ], 
                        toolbar: [ 
                            {
                                name: 'history', items: [ 'undo', 'redo' ]
                            },
                            {
                                name: 'formatting', items: [ 'formatselect']
                            },
                            {
                                name: 'font-editing', items: ['bold', 'italic', 'backcolor']
                            },
                            {
                                name: 'alignment', items: ['alignleft', 'aligncenter', 'alignright', 'alignjustify']
                            },
                            {
                                name: 'indent / list', items: [ 'bullist', 'numlist', 'outdent', 'indent' ]
                            },
                            {
                                name: 'misc', items: ['removeformat', 'media', 'help']
                            }
                        ],
                    }}
                    onEditorChange={this.handleEditorChange}
                    
                />

                <div dangerouslySetInnerHTML={{__html: this.state.content}}></div>
            </div>
        )
    }

}