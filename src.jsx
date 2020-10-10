class SearchBtn extends React.Component {
  render() {
    return (
      <button className="searchbtn" onClick={() => this.props.onClick()}>
        Search
      </button>
    );
  }
}

class SearchDiv extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query : null,
    };
  }

  search(){
    this.setState({query:"Hey there"});
  }
  
  render() {

    return (
      <div className="searchdiv">
        <SearchBtn onClick={()=>{this.search()}} />
        <p>{this.state.query}</p>
      </div>
    );
  }
}

ReactDOM.render(
    <SearchDiv />,
    document.getElementById('home')
  );