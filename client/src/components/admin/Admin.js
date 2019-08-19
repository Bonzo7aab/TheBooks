import React, { Component } from "react"
import AddBook from "./AddBook"
import AddBooks from "./AddBooks"
import { AddArticle } from "./AddArticle"

class Admin extends Component {
	state = {
		whichAdminPanel: ""
	}

	whichAdminPanelShow = () => {
		switch (this.state.whichAdminPanel) {
			case "addBook":
				return <AddBook />
			case "addBooks":
				return <AddBooks />
			case "addArticle":
				return <AddArticle />
			default:
				break
		}
	}

	render() {
		return (
			<div>
				<h2 className="ui header">
					<i className="settings icon" />
					<div className="content">Admin Panel</div>
				</h2>
				<button
					className="ui button"
					onClick={() => this.setState({ whichAdminPanel: "addBook" })}
				>
					Add Book
				</button>
				<button
					className="ui button"
					onClick={() => this.setState({ whichAdminPanel: "addBooks" })}
				>
					Add Books
				</button>
				<button
					className="ui button"
					onClick={() => this.setState({ whichAdminPanel: "addArticle" })}
				>
					Add Article
				</button>
				<hr />
				{this.whichAdminPanelShow()}
			</div>
		)
	}
}

export default Admin
