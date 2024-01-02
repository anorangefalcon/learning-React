import { useState } from "react";

const Accordian = () => {
  [isVisible, setIsVisible] = useState("");

  const helperFnc = (section) => {
    if (section != isVisible) {
      setIsVisible(section);
    } else {
      setIsVisible("");
    }
  };

  return (
    <div className="accordian">
      <Section
        title="Section 1"
        body="First Paragraph Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium aut eveniet consectetur vero, iste veniam sit alias, necessitatibus temporibus qui aperiam aspernatur, quod nemo. Quos similique autem facere illo laboriosam!"
        isVisible={isVisible === "section 1"}
        setVisible={() => helperFnc("section 1")}
      />
      <Section
        title="Section 2"
        body="Second Paragraph Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium aut eveniet consectetur vero, iste veniam sit alias, necessitatibus temporibus qui aperiam aspernatur, quod nemo. Quos similique autem facere illo laboriosam!"
        isVisible={isVisible === "section 2"}
        setVisible={() => helperFnc("section 2")}
      />
    </div>
  );
};

const Section = ({ title, body, isVisible, setVisible }) => (
  <div
    onClick={() => {
      setVisible(true);
    }}
    className="section container"
  >
    <h1>{title}</h1>
    {isVisible && <p>{body}</p>}
  </div>
);

export default Accordian;
