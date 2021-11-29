import '../layouts/Layout.css'
import apiGetData from './data.json'
import { Controller, useForm } from 'react-hook-form';
import { Card, FormControl, InputGroup, Container, Row, Col, Form } from 'react-bootstrap';
import { queryByLabelText } from '@testing-library/react';
import NumberFormat from 'react-number-format';



const ApplicationForm = (props: any) => {

  const { register, handleSubmit, watch, formState: { errors }, control, setValue, getValues } = useForm();
  const onSubmit = (testData: any) => console.log(testData);


  const handleSolePropChange = (e: any) => {
    // e.preventDefault();
    let value = e.target.value;
    // console.log("handleSolePropChange", value);
    if (value && typeof value === "string") {
      if (value.toLowerCase() === "true") {
        setValue("apiPostData.business._extension.soleProprietorship", "true", {
          shouldValidate: true,
          shouldDirty: true
        });
      }
      if (value.toLowerCase() === "false") {
        // console.log("handleSolePropChange is string", value);
        setValue("apiPostData.business._extension.soleProprietorship", "false", {
          shouldValidate: true,
          shouldDirty: true
        })
      }
    }
    console.log("sole prop: ", getValues("apiPostData.business._extension.soleProprietorship"));
  }

  const normalizeInput = (value: any, previousValue: any) => {
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;

    if (!previousValue || value.length > previousValue.length) {
      if (cvLength < 4) return currentValue;
      if (cvLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
    }
  };

  // const handleWeatherChange = (e: any) => {
  //   console.log("weather changed: ", e.target.value);
  //   setValue("apiGetData.weather", e.target.value, {
  //     shouldValidate: true,
  //     shouldDirty: true
  //   })
  // }

  return (
    <Container fluid="md">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Card>
            <Card.Body>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Container>
                  <Row>
                    <Col>
                      <h3>Applicant Info</h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <label className="text-input__label">Is the business you're filling out this application for a sole proprietorship?</label>
                      <div className="text-input__input-container">
                        <label htmlFor="radioYes">
                          <input type="radio" value="true"
                            {...register("apiPostData.business._extension.soleProprietorship", { required: false })}
                            defaultChecked={apiGetData.business._extension.soleProprietorship === "true"}
                            onChange={handleSolePropChange}
                            id="radioYes" /> Yes </label>

                        <label htmlFor="radioNo">
                          <input type="radio" value="false"
                            {...register("apiPostData.business._extension.soleProprietorship", { required: false })}
                            defaultChecked={apiGetData.business._extension.soleProprietorship === "false"}
                            onChange={handleSolePropChange}
                            id="radioNo" /> No </label>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Controller defaultValue={apiGetData.business.doingBusinessAs}
                        name="apiPostData.business.doingBusinessAs"
                        control={control}
                        render={({ field }) =>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Doing Business As (DBA), If Applicable</Form.Label>
                            <Form.Control
                              {...register("apiPostData.business.doingBusinessAs", { required: false })} {...field} />
                          </Form.Group>}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Controller defaultValue={apiGetData.business.state}
                        name="apiPostData.business.state"
                        control={control}
                        render={({ field }) =>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>State</Form.Label>
                            <Form.Select aria-label="Select State" {...field}
                              {...register("apiPostData.business.state", { required: false })}
                            >
                              <option>Select State</option>
                              <option value="AL">AL</option>
                              <option value="AK">AK</option>
                              <option value="AS">AS</option>
                              <option value="VA">VA</option>
                            </Form.Select>
                          </Form.Group>} />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Controller
                        name="apiPostData.owners.0.email"
                        control={control}
                        defaultValue={apiGetData.owners[0].email} 
                        render={({ field }) =>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email"placeholder="name@example.com"
                              {...register("apiPostData.owners.0.email", { required: false })}  {...field} />
                          </Form.Group>}
                      />
                    </Col>
                  </Row>
                  {getValues("apiPostData.business._extension.soleProprietorship") === "true" && <Row>
                    <Col>
                      <Controller
                        control={control} defaultValue={apiGetData.business.taxId}
                        name="apiPostData.business.taxId"
                        render={({ field }) =>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Business Tax ID (EIN)</Form.Label>
                            {/* <Form.Control
                              {...register("apiPostData.business.taxId", { required: false })} {...field} /> */}
                            <NumberFormat format="##-#######" className="form-control" {...field} placeholder="##-#######"
                              {...register("apiPostData.business.taxId", { required: false })} />
                          </Form.Group>}
                      />
                    </Col>
                  </Row>
                  }
                  <Row>
                    <Col>
                      <Controller
                        control={control}
                        name="apiPostData.business.phone" defaultValue={apiGetData.business.phone} 
                        render={({ field }) =>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Business Phone Number</Form.Label>
                            <NumberFormat format="###-###-####" className="form-control" {...field} placeholder="###-###-####"
                              {...register("apiPostData.business.phone", { required: false })} />
                            {/* <Form.Control defaultValue={apiGetData.business.phone}
                              {...register("apiPostData.business.phone", { required: false })} {...field} /> */}
                          </Form.Group>}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <input type="submit" />
                    </Col>
                  </Row>
                </Container>
              </form>
            </Card.Body>
          </Card></Col>
      </Row>
    </Container>
  );
};

export default ApplicationForm;



{/* <div className="input-factory input-factory--string">
                    <div className="text-input__container">
                      <p>I would like to:</p>
                      <label htmlFor="field-rain">
                        <input
                          {...register("apiPostData.weather")}
                          type="radio"
                          name="weather"
                          value="rain"
                          id="field-rain"
                          defaultChecked={apiGetData.weather === "rain"}
                          onChange={handleWeatherChange}
                        />
                        Rain
                      </label>
                      <label htmlFor="field-wind">
                        <input
                          {...register("apiPostData.weather")}
                          type="radio"
                          name="weather"
                          value="wind"
                          id="field-wind"
                          defaultChecked={apiGetData.weather === "wind"}
                          onChange={handleWeatherChange}
                        />
                        Lots of wind
                      </label>
                      <label htmlFor="field-sun">
                        <input
                          {...register("apiPostData.weather")}
                          type="radio"
                          name="weather"
                          value="sun"
                          id="field-sun"
                          defaultChecked={apiGetData.weather === "sun"}
                          onChange={handleWeatherChange}
                        />
                        Sunny
                      </label>
                    </div>
                  </div> */}