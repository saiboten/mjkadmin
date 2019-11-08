var React = require('react');
var HighScoreElement = require('./HighScoreElement')

var HighScoreList = React.createClass({

    componentDidMount() {
        console.log("componentDidMount");
    },

    render() {

      console.log("toplist", this.props.topList);

        return (
        <ol>
          {this.props.topList.filter(function(user) {
            return user.score > 0;
          }).map((topListUser, index) => {
                  return (<HighScoreElement key={index} user={this.props.user} topListUser={topListUser}  />);
          })}
        </ol>
        );
    }
});

export default HighScoreList;
