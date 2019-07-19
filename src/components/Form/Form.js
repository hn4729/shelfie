import React, { Component } from "react";
import axios from "axios";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
      imgurl: "",
      id: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  }

  handleReset() {
    this.setState({ name: "", price: 0, imgurl: "" });
    console.log(this.state);
  }

  // componentDidMount() {
  //   const editId = this.props.editId;
  //   this.setState({ id: editId });
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps !== this.props.data) {
  //     console.log("need to edit");
  //   }
  // }

  create() {
    const { name, price, imgurl } = this.state;

    axios.post("/api/product", {
      name: name,
      price: price,
      imgurl: imgurl
    });
  }

  update(id) {
    axios
      .put(`/api/product/${id}`, {
        name: this.props.editName,
        price: this.props.editPrice,
        imgurl: this.props.editImgurl.join("")
      })
      .then(() => this.props.getInventory());
  }

  render() {
    return (
      <div>
        <form
          onSubmit={event => {
            event.preventDefault();
            this.create();
            this.handleReset();
          }}
        >
          <label>
            <span>Name</span>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <span>Price</span>
            <input
              type="text"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </label>
          <label>
            <span>Image URL</span>
            <input
              type="text"
              name="imgurl"
              value={this.state.imgurl}
              onChange={this.handleChange}
            />
          </label>
          <button type="reset" onClick={() => this.handleReset()}>
            Cancel
          </button>
          <button type="submit">Add to Inventory</button>
        </form>
        {/* {this.props.editStatus && (
          <form
            onSubmit={event => {
              event.preventDefault();
              console.log(this.props);
              this.update(this.props.editId);
              this.props.handleEditStatus();
            }}
          >
            <label>
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={this.props.editName}
                onChange={this.props.handleChange}
              />
            </label>
            <label>
              <span>Price</span>
              <input
                type="text"
                name="price"
                value={this.props.editPrice}
                onChange={this.props.handleChange}
              />
            </label>
            <label>
              <span>Image URL</span>
              <input
                type="text"
                name="imgurl"
                value={this.props.editImgurl}
                onChange={this.props.handleChange}
              />
            </label>
            <button type="reset" onClick={() => this.handleReset()}>
              Cancel
            </button>
            <button type="submit">Save Changes</button>
          </form>
        )} */}
      </div>
    );
  }
}

export default Form;
