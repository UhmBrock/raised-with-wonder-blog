import React from 'react';
import { RouteComponentProps } from 'react-router';
import './BlogCreateForm.scss';
import '../ResponsiveImage/ResponsiveImage.scss';

// Import TinyMCE
import { Editor } from '@tinymce/tinymce-react';
import Axios from 'axios';
import Config from '../../externals/config';

interface BCFProps extends Pick<RouteComponentProps<{title?: string}>, "match">{
    // Any additional props you need
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
    
    componentWillMount() {
        
        Axios({
            method: "GET",
            url: `${Config.getBackendURL()}/blog/${this.props.match.params.title}`,
        }).then(res => {
            this.setState({content: res.data.html});
        });

    }

    render() {

        console.log(this.props.match.params.title);

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