import React, { Component } from 'react'
import Quill from 'quill'

class ReactQuill extends Component {
    componentDidMount() {
        new Quill('#editor', {
            theme: 'snow',
            placeholder: 'Compose an epic...',
        })
    }
    render() {
        return (
            <div>
                <div id="editor">
                </div>
            </div>
        )
    }
}

export default ReactQuill