import classes from "../../styles/Button.module.css";

function AButton(props) {
  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
        rel="stylesheet"
      />
      <button className={classes.btn} onClick={props.clicked}>
        {props.text}
      </button>
    </div>
  );
}

export default AButton;
