const Participant = require("../../../models/certificateModule/participant");
const addEvent = require("../../../models/certificateModule/addevent");
const mailSender = require("../../mailsender");
const ejs = require("ejs");

const sendEmailsToParticipants = async (eventId, baseURL) => {
  try {
    // Fetch all participants from the database
    console.log(eventId);
    const allParticipants = await Participant.find({ eventId });
    console.log(allParticipants);
    if (!allParticipants) {
      throw new Error("No participants found");
    }

    // Fetch the event from the database based on the provided eventId and get event.name, if it exists
    const event = await addEvent.find({ eventId });
    if (!event) {
      throw new Error("Event not found");
    }

    // Assuming you have an emails.ejs template in your views folder
    const path = require("path");
    const emailTemplatePath = path.join(__dirname, "email.ejs");

    // Loop through all participants and send emails for matching eventId
    for (const participant of allParticipants) {
      console.log("1234");
      if (
        participant.eventId.toString() === eventId.toString() &&
        !participant.isCertificateSent
      ) {
        const url = `${baseURL}/cm/c/${eventId}/${participant._id}`;

        const templateData = {
          participantName: participant.name,
          eventName: event.name,
          certificateURL: url,
        };

        // Render the template with data
        let emailBody = await ejs.renderFile(emailTemplatePath, templateData);
        const emailTitle = `${event.name}: Your certificate is here!`;

        // Send email
        console.log("123");
        console.log(participant.mailId);

        await mailSender(participant.mailId, emailTitle, emailBody);

        // Update isCertificateSent property and save the participant in the database
        participant.isCertificateSent = true;
        await participant.save();
      }
    }
    console.log("hi");
    console.log("Emails sent successfully!");
  } catch (error) {
    console.error("Error sending emails:", error);
  }
};

module.exports = { sendEmailsToParticipants };
