import React, { Component } from "react"
import { connect } from "react-redux"
import { EditorState, convertToRaw, convertFromRaw } from "draft-js"
import { stateToHTML } from "draft-js-export-html"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

export class AddArticle extends Component {
	state = {
		editorState: EditorState.createEmpty(),
		rawState: null
	}

	onEditorStateChange = editorState => {
		this.setState({ editorState })
	}

	onAddArticle = () => {
		var convertedData = convertToRaw(this.state.editorState.getCurrentContent())
		this.setState({ rawState: convertedData })
		// https://jpuri.github.io/react-draft-wysiwyg/#/docs?_k=jjqinp
	}
	convertCommentFromJSONToHTML = text => {
		return stateToHTML(convertFromRaw(JSON.parse(text)))
	}

	render() {
		const { editorState } = this.state
		return (
			<div>
				<Editor
					editorState={editorState}
					toolbarClassName="toolbarClassName"
					wrapperClassName="wrapperClassName"
					editorClassName="editorClassName"
					onEditorStateChange={this.onEditorStateChange}
				/>
				<button className="ui button green" onClick={this.onAddArticle}>
					Add Article
				</button>
				<div id="comment-div">
					<div
						dangerouslySetInnerHTML={{
							__html: this.convertCommentFromJSONToHTML(this.state.rawState)
						}}
					/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddArticle)
