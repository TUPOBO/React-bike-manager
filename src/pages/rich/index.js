import React, { Component } from 'react'
import { Card, Button, Modal } from 'antd'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js'
import draftjs from 'draftjs-to-html'

class RichText extends Component {
	constructor(props) {
		super(props)
		this.state = {
      editorState: EditorState.createEmpty(),
      showRichText: false
		}
  }

  handleClearContent = () => {
    this.setState({
      editorState: EditorState.createEmpty()
    })
  }

  handleGetText = () => {
    this.setState({
      showRichText: true
    })
  }

	onEditorStateChange = (editorState) => {
		this.setState({
			editorState
		})
  }

  onContentStateChange = (contentState) => {
    this.setState({
      contentState
    })
  }

	render() {
		const { editorState } = this.state
		return (
			<div>
        <Card>
          <Button type='primary' onClick={this.handleClearContent}>清空内容</Button>
          <Button type='primary' onClick={this.handleGetText}>获取HTML文本</Button>
        </Card>
				<Card title="富文本编辑器">
					<Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
						wrapperClassName="demo-wrapper"
						editorClassName="demo-editor"
            onEditorStateChange={this.onEditorStateChange}
            onContentStateChange={this.onContentStateChange}
					/>
				</Card>
        <Modal title='富文本' visible={this.state.showRichText}
          onCancel={() => {
            this.setState({
              showRichText: false
            })
          }}
          footer={null}
        >
          {
            draftjs(this.state.contentState)
          }
        </Modal>
			</div>
		)
	}
}

export default RichText
