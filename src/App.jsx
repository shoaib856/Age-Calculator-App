import { useState } from "react";
import "./App.css";
import submitBtn from "./assets/images/icon-arrow.svg";
import { useFormik } from "formik";
import * as yup from "yup";
import moment from "moment";

const initialValues = {
  day: "",
  month: "",
  year: "",
};

const validationSchema = yup.object({
  day: yup
    .number()
    .required("This field is required")
    .min(1, "must be valid day")
    .max(31, "must be valid day"),
  month: yup
    .number()
    .required("This field is required")
    .min(1, "must be valid month")
    .max(12, "must be valid month"),
  year: yup
    .number()
    .required("This field is required")
    .min(
      new Date(Date.now()).toLocaleString("en-Us", { year: "numeric" }) - 500,
      `must be greater than or equal ${
        new Date(Date.now()).toLocaleString("en-Us", { year: "numeric" }) - 500
      }`
    )
    .max(
      new Date(Date.now()).toLocaleString("en-Us", { year: "numeric" }),
      "must be in the past"
    ),
});
function App() {
  const [dayResult, setDayResult] = useState("- -");
  const [monthResult, setMonthResult] = useState("- -");
  const [yearResult, setYearResult] = useState("- -");
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const { day, month, year } = values;
      const today = moment();
      const birthDate = moment({ year, month: month - 1, day });
      const age = today.diff(birthDate, "years");
      const monthAge = today.diff(birthDate, "months") % 12;
      const dayAge = today.diff(birthDate, "days") % 30;
      if (dayAge < 0) {
        const lastMonth = moment().subtract(1, "month");
        const daysInMonth = lastMonth.daysInMonth();
        setYearResult(age);
        setMonthResult(
          lastMonth.diff(birthDate.add(age, "years").add(1, "month"), "months")
        );
        setDayResult(daysInMonth + dayAge);
      } else {
        setYearResult(age);
        setMonthResult(monthAge);
        setDayResult(dayAge);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="input-fields">
          <label>
            <p
              style={{
                color:
                  formik.touched.day &&
                  formik.errors.day &&
                  "hsl(0, 100%, 67%)",
              }}
            >
              DAY
            </p>
            <input
              {...formik.getFieldProps("day")}
              type="number"
              name="day"
              placeholder="DD"
              id=""
              required
              style={{
                borderColor:
                  formik.touched.day &&
                  formik.errors.day &&
                  "hsl(0, 100%, 67%)",
              }}
            />
            {formik.touched.day && formik.errors.day && (
              <span>{formik.errors.day}</span>
            )}
          </label>
          <label>
            <p
              style={{
                color:
                  formik.touched.month &&
                  formik.errors.month &&
                  "hsl(0, 100%, 67%)",
              }}
            >
              MONTH
            </p>
            <input
              {...formik.getFieldProps("month")}
              type="number"
              name="month"
              placeholder="MM"
              id=""
              required
              style={{
                borderColor:
                  formik.touched.month &&
                  formik.errors.month &&
                  "hsl(0, 100%, 67%)",
              }}
            />
            {formik.touched.month && formik.errors.month && (
              <span>{formik.errors.month}</span>
            )}
          </label>
          <label>
            <p
              style={{
                color:
                  formik.touched.year &&
                  formik.errors.year &&
                  "hsl(0, 100%, 67%)",
              }}
            >
              YEAR
            </p>
            <input
              {...formik.getFieldProps("year")}
              type="number"
              name="year"
              placeholder="YYYY"
              id=""
              required
              style={{
                borderColor:
                  formik.touched.year &&
                  formik.errors.year &&
                  "hsl(0, 100%, 67%)",
              }}
            />
            {formik.touched.year && formik.errors.year && (
              <span>{formik.errors.year}</span>
            )}
          </label>
        </div>
        <div className="submit-btn">
          <hr />
          <button type="submit">
            <img src={submitBtn} alt="Submit Button" />
          </button>
        </div>
      </form>

      <div className="result">
        <p>
          <span>{yearResult}</span>years
        </p>
        <p>
          <span>{monthResult}</span>months
        </p>
        <p>
          <span>{dayResult}</span>days
        </p>
      </div>
    </>
  );
}

export default App;
