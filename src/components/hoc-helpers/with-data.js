const withData = (View, getData) => {
  return (props) => {
    return <View getData={getData} {...props}/>
  }
}

export default withData;
