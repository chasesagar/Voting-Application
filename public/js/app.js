
// creating our first react component using class based function
class ProductList extends React.Component {
  constructor(props) {
    super(props);
    // lifting the state.
    this.state = {
      products: [],
    };

    this.handleProductUpVote = this.handleProductUpVote.bind(this);
  }
  

  componentDidMount() {
    this.setState({ products: Seed.products });
  }

  // upvote function 
  // basiclly we are emplementing a call back function( refer notes )
  // call back step:C actual implementation of app in parent component
  handleProductUpVote(productId) {
    const nextProducts = this.state.products.map((product) => {
      if (product.id === productId) {
        return Object.assign({}, product, {
          votes: product.votes + 1,
        });
      } else {
        return product;
      }
    });
    this.setState({
      products: nextProducts,
    });
  }
  render() {
    // function to sort on the basis of votes
    const products = this.state.products.sort((a, b) => (
      b.votes - a.votes
    ));
    // function to pass sorted data to child product component as props.
    const productComponents = products.map((product) => (
      <Product
        key={'product-' + product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onVote={this.handleProductUpVote} // call back  step A: passing a function to one child component
      />
    ));
    // returning properly aligned and ready data.
    return (
      <div className='ui unstackable items'>
        {productComponents}
      </div>
    );
  }
}

// creating another child component which going to add 
// For every product, add an image, a title, a description, and an avatar of the post author.
class Product extends React.Component {
  // callback step: B calling upvote inside child component
  constructor(props) {
    super(props);

    this.handleUpVote = this.handleUpVote.bind(this);
  }

  // Inside `Product`
  handleUpVote() {
    this.props.onVote(this.props.id); // actual B step
  }
  render() {
    return (
      <div className='item'>
        <div className='image'>
          <img src={this.props.productImageUrl} />
        </div>
        {/* Inside `render` for Product` */}
        <div className='middle aligned content'>
          <div className='header'>
            <a onClick={this.handleUpVote}>
              <i className='large caret up icon' />
            </a>
            {this.props.votes}
          </div>
          <div className='description'>
            <a href={this.props.url}>
              {this.props.title}
            </a>
            <p>
              {this.props.description}
            </p>
          </div>
          <div className='extra'>
            <span>Submitted by:</span>
            <img
              className='ui avatar image'
              src={this.props.submitterAvatarUrl}
            />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
);