/* @flow */

import {connect} from "react-redux"
import React from "react"
import classNames from "classnames"

import type {Dispatch, State} from "../state/types"
import {reactElementProps} from "../test/integration"
import Packets from "../state/Packets"
import * as view from "../state/reducers/view"

type Props = {
  downloads: *[],
  downloadsIsOpen: boolean
}

export default class DownloadProgress extends React.Component<Props> {
  render() {
    const {downloads, downloadsIsOpen} = this.props
    if (!downloadsIsOpen || downloads.length === 0) return null

    const {percentComplete, error} = downloads[0]
    const complete = percentComplete >= 1

    return (
      <div
        className={classNames("download-progress", {
          complete,
          error: error
        })}
      >
        <div className="message-wrapper">
          <p className="message" {...reactElementProps("downloadMessage")}>
            {message({complete, error})}
          </p>
        </div>

        <div className="progress-bar">
          <div
            className="progress-value"
            style={{width: percentComplete * 100 + "%"}}
          />
        </div>
      </div>
    )
  }
}

const message = ({complete, error}) =>
  error
    ? `Download error: ${error}`
    : complete
    ? "Download Complete"
    : "Downloading"

const stateToProps = (state: State) => ({
  downloads: Packets.getDownloads(state),
  downloadsIsOpen: view.getDownloadsIsOpen(state)
})

export const XDownloadProgress = connect<
  Props,
  {},
  _,
  {dispatch: Dispatch},
  _,
  _
>(stateToProps)(DownloadProgress)
