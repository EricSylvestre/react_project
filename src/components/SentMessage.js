import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

export const SentMessage = (props) => 
{
    const p = props.SentMessage
    return (
        <li className="list-group-item">
            <div>
                <Link to={`/sentmessage/${p.id}`}>{p.body}</Link>
                <span className="float-right">
                    <small>
                        {moment(p.dateCreated.toDate()).fromNow()}
                    </small>
                </span>
            </div>
            <div>
                <cite> &mdash; {`${p.user.name}`}</cite>
            </div>
        </li>

    )
}
