import {
  Form,
  FormLayout,
  TextField,
  Button,
  LegacyCard,
  Page,
  RadioButton,
  Stack,
  Checkbox,
  Label,
  Select,
} from "@shopify/polaris";
import { useState, useCallback } from "react";

export default function UserForm() {
  const [url, setUrl] = useState("");
  const [password, setPwd] = useState("");
  const [checked, setChecked] = useState(false);

  const handleSubmit = useCallback((_event) => setUrl(""), []);

  const [selected, setSelected] = useState("Select an option");

  const handleSelectChange = useCallback((value) => setSelected(value), []);

  const options = [
    { label: "Gujarat", value: "gujarat" },
    { label: "Ahmedabad", value: "ahmedabad" },
    { label: "Surat", value: "surat" },
  ];

  const handleEmailChange = useCallback((value) => setUrl(value), []);
  const handlePasswordChange = useCallback((value) => setPwd(value), []);
  const handleHobbiesChange = useCallback(
    (newChecked) => setChecked(newChecked),
    []
  );

  return (
    <Page>
      <LegacyCard sectioned title="Form">
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <TextField
              value={url}
              onChange={handleEmailChange}
              label="Email"
              type="email"
              autoComplete="off"
            />
            <TextField
              value={password}
              onChange={handlePasswordChange}
              label="Password"
              type="password"
              autoComplete="off"
            />
            <Stack>
              <RadioButton label="Male" checked id="male" name="accounts" />
              <RadioButton label="Female" id="female" name="accounts" />
            </Stack>
            <Stack alignment="center">
              <Label>Hobbies: </Label>
              <Checkbox
                label="Reading"
                checked
                onChange={handleHobbiesChange}
              />
              <Checkbox label="Dancing" />
              <Checkbox label="Travelling" />
            </Stack>
            {/* <Stack> */}
            <Select
              label="City"
              options={options}
              onChange={handleSelectChange}
              value={selected}
            />
            {/* </Stack> */}
            <Button submit>Submit</Button>
          </FormLayout>
        </Form>
      </LegacyCard>
    </Page>
  );
}
