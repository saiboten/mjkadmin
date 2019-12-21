/**
 * Created by Tobias on 03.10.2016.
 */
import React from "react";

import moment from "moment";
import { H1 } from "../lib/Heading";
import { addDay, fetchAdminData } from "../../api/adminApi";

class AdminAddDay extends React.Component {
  state = {
    description: "",
    optionalSolutionVideo: "",
    solutionArtist: "",
    solutionSong: "",
    link: "",
    revealDate: moment().toDate(),
    solutionDate: moment().toDate()
  };

  constructor(props) {
    super(props);
    this.changeRevealDate = this.changeRevealDate.bind(this);
    this.changeSolutionDate = this.changeSolutionDate.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.changeSolutionArtist = this.changeSolutionArtist.bind(this);
    this.changeSolutionSong = this.changeSolutionSong.bind(this);
    this.changeLink = this.changeLink.bind(this);
    this.addDay = this.addDay.bind(this);
    this.changeOptionalSolutionVideo = this.changeOptionalSolutionVideo.bind(
      this
    );
  }

  changeRevealDate(date) {
    this.setState({
      revealDate: date
    });
    console.log("New date: ", date);
  }

  changeSolutionDate(date) {
    this.setState({
      solutionDate: date
    });
    console.log("New date: ", date);
  }

  changeDescription(event) {
    this.setState({ description: event.target.value });
  }

  changeSolutionArtist(event) {
    this.setState({ solutionArtist: event.target.value });
  }

  changeSolutionSong(event) {
    this.setState({ solutionSong: event.target.value });
  }

  changeOptionalSolutionVideo(event) {
    this.setState({ optionalSolutionVideo: event.target.value });
  }

  changeLink(event) {
    this.setState({ link: event.target.value });
  }

  addDay() {
    var saveObject = {
      link: this.state.link,
      description: this.state.description,
      optionalSolutionVideo: this.state.optionalSolutionVideo,
      solutionArtist: this.state.solutionArtist,
      solutionSong: this.state.solutionSong,
      revealDate: this.state.revealDate.valueOf(),
      solutionDate: this.state.solutionDate.valueOf(),
      revealDateAsString: moment(this.state.revealDate).format("YYYY-MM-DD")
    };

    console.log("Save object: ", saveObject);
    addDay(saveObject);
    fetchAdminData();
  }

  render() {
    return (
      <div className="col-md-6 pane">
        <H1>Legg til dag</H1>
        <div>
          <table>
            <tbody>
              <tr>
                <td>Kalender åpner</td>
                <td>
                  {/* <DatePicker
                    selected={this.state.revealDate}
                    onChange={this.changeRevealDate}
                  /> */}
                </td>
              </tr>
              <tr>
                <td>Dag avsluttes</td>
                <td>
                  {/* <DatePicker
                    selected={this.state.solutionDate}
                    onChange={this.changeSolutionDate}
                  /> */}
                </td>
              </tr>
              <tr>
                <td>Sang/Fasit</td>
                <td>
                  <input
                    type="text"
                    onChange={this.changeSolutionSong}
                    value={this.state.solutionSong}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <p>
            <button onClick={this.addDay}>Legg til dag</button>
          </p>
        </div>
      </div>
    );
  }
}

export default AdminAddDay;
