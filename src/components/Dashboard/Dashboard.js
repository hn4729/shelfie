import React, { Component } from "react";
import Product from "../Product/Product";
import axios from "axios";

class Dashboard extends Component {
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
    // this.handleEditValues = this.handleEditValues.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.handleEditStatus = this.handleEditStatus.bind(this);
  }
  deleteProduct(id) {
    axios.delete(`/api/product/${id}`);
    this.getInventory();
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

  render() {
    return (
      <div>
        {this.state.inventory.map((product, index) => (
          <div key={index}>
            <Product
              name={product.name}
              price={product.price}
              imgurl={product.imgurl}
            />
            <button onClick={() => this.deleteProduct(product.id)}>
              Delete
            </button>
            <button
              onClick={() => {
                this.props.handleEditValues(
                  product.id,
                  product.name,
                  product.price,
                  product.imgurl
                );
                this.props.handleEditStatus();
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default Dashboard;
