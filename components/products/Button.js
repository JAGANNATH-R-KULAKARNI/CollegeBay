import classes from "../../styles/Button.module.css";

function AButton(props) {
  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
        rel="stylesheet"
      />
      <button
        className={classes.btn}
        onClick={props.clicked ? props.clicked : null}
        style={{
          fontSize: props.size ? props.size : "16px",
          minWidth: props.mindis ? props.mindis : "0px",
          top: props.present ? "2px" : "0px",
          boxShadow: props.present ? "0 4px #583e81" : "0 6px black",
        }}
      >
        {props.text ? props.text : null}
      </button>
    </div>
  );
}

export default AButton;
