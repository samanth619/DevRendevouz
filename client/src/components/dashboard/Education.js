import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {

    onDeleteClick(id){
        this.props.deleteEducation(id);
    }

    render() {
        const education = this.props.education.map(edu=>(
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>{edu.fieldofstudy}</td>
                <Moment format="YYYY/MM/DD">{edu.from}</Moment> - 
                {edu.to===null ? ('Now') : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>) }
                <td><button className="btn btn-danger" type="button" onClick= {this.onDeleteClick.bind(this,edu._id)}>Delete</button></td>
            </tr>              
        ))
        return (
            <div>
               <h4 className="mb-4">Education credentials</h4>
                <table className="table">
                    <thead>
                      <tr>
                        <th>School</th>
                        <th>Degree</th>
                        <th>Field Of Study</th>
                        <th>Years</th>                        
                        <th>Remove Education</th>
                      </tr>
                    </thead>
                        {education}                    
                </table>
            </div>
        )
    }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
};

export default connect(null,{deleteEducation})(Education);
