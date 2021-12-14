/*
  Student ID: 301145757 , 301143620 , 301173877 , 301178658 , 301182897 , 300977318
  Web App Name: Runtime
  Description: An Incident Management Application
*/


let mongoose = require('mongoose');

// Create a model class
let incidentModel = mongoose.Schema(
    {
        Description: String,
        Priority: {
            type: String,
            default: "Medium",       // e.g. Low, Medium, High
            trim: true
        },
        RequesterName: String,
        RecordNumber: String,        // e.g. 130418-0000001 for Apr 13 2018, ticket no 1
        Narrative: String,         
        Technician: {
            type: String,
            default: "Unassigned"
        },
        Status: {
            type: String,
            default: "New",         // e.g. New, In Progress, Closed
            trim: true
        },
        CreatedDate: {
            type: Date,
            default: Date.now
        },
        TimeStamped: {
            type: Date,
            default: Date.now
        },
        Resolution: {
            type: String,
            default: "",         // e.g. New, In Progress, Closed
            trim: true
        }
    },
    {
        collection: "incidents"
    }
);

module.exports = mongoose.model('Incident', incidentModel);