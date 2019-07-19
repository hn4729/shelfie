import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import { HashRouter } from "react-router-dom";
import routes from "./routes";
import { Link } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      id: null,
      name: "",
      price: 0,
      imgurl: "",
      editStatus: false
    };
    this.getInventory = this.getInventory.bind(this);
    this.handleEditValues = this.handleEditValues.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditStatus = this.handleEditStatus.bind(this);
  }

  componentDidMount() {
    this.getInventory();
  }

  componentDidUpdate() {
    this.getInventory();
  }

  getInventory = () => {
    axios
      .get("/api/inventory")
      .then(response => {
        this.setState({ inventory: response.data });
      })
      .catch(e => {
        console.log(e);
        console.log("Error in getting inventory");
      });
  };

  handleEditValues = (id, name, price, imgurl) => {
    this.setState({ id: id, name: name, price: price, imgurl: imgurl });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: [event.target.value] });
  };

  handleEditStatus() {
    if (this.state.editStatus) {
      this.setState({ editStatus: false });
    } else {
      this.setState({ editStatus: true });
    }
  }

  render() {
    return (
      <HashRouter>
        <div className="App">
          {/* <Header />
        <Dashboard
          inventory={this.state.inventory}
          getInventory={this.getInventory}
          handleEditValues={this.handleEditValues}
          handleEditStatus={this.handleEditStatus}
        />
        <Form
          getInventory={this.getInventory}
          editId={this.state.id}
          editName={this.state.name}
          editPrice={this.state.price}
          editImgurl={this.state.imgurl}
          handleChange={this.handleChange}
          handleEditStatus={this.handleEditStatus}
          editStatus={this.state.editStatus}
        /> */}
          <Header />
          {routes}
        </div>
      </HashRouter>
    );
  }
}

export default App;
