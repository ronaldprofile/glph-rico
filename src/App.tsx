import { ChangeEvent, FormEvent, useState } from "react";
import { Form } from "./components/Form";
import { formatCurrency } from "./utils/currency";

const dailyWorkingHours = ["9h", "10h", "12h", "14h"];

const formFieldsInitialState = {
  salaryPerMonth: "",
  expensePerMonth: "",
  dailyWorkingHour: ""
};

type Budget = {
  glph: string;
  amountPerDay: string;
  amountPerWeek: string;
  amountPerMonth: string;
};

export function App() {
  const [formFields, setFormFields] = useState(formFieldsInitialState);
  const [budget, setBudget] = useState<Budget | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  function handleChangeForm(event: ChangeEvent<HTMLInputElement>) {
    const field = event.target.name;
    const fieldValue = event.target.value;

    setFormFields(prevState => ({
      ...prevState,
      [field]: fieldValue
    }));
  }

  function handleValidateFormFields() {
    const emptyField = Object.values(formFields).some(
      fieldValue => fieldValue === ""
    );

    return { formFieldsEmpty: emptyField };
  }

  async function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { formFieldsEmpty } = handleValidateFormFields();

    if (formFieldsEmpty) {
      alert("Preencha todos os campos");
      return;
    }

    setIsLoading(true);

    const { summary } = handleCalculateBudget();

    await new Promise(resolve => setTimeout(() => resolve(""), 2000));
    setIsLoading(false);

    const { amounPerHour, amountPerDay, amountPerWeek, amountPerMonth } =
      summary;

    setBudget({
      glph: amounPerHour,
      amountPerDay,
      amountPerWeek,
      amountPerMonth
    });
  }

  function getDaysInMonth() {
    const today = new Date();

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;

    return new Date(currentYear, currentMonth, 0).getDate();
  }

  function handleCalculateBudget() {
    const { amounPerHour } = handleCalculateGLPH();

    const { amountPerDay } = handleCalculateGLPPerDay(amounPerHour);

    const { amountPerWeek } = handleCalculateGLPPerWeek(amountPerDay);
    const { amountPerMonth } = handleCalculateGLPPerMonth(amountPerDay);

    const summary = {
      amounPerHour: formatCurrency(amounPerHour),
      amountPerDay: formatCurrency(amountPerDay),
      amountPerWeek: formatCurrency(amountPerWeek),
      amountPerMonth: formatCurrency(amountPerMonth)
    };

    return { summary };
  }

  function handleCalculateGLPH() {
    const { dailyWorkingHour, salaryPerMonth, expensePerMonth } = formFields;

    const dailyWorkingHourPerDay = Number(dailyWorkingHour.replace(/h/, ""));
    const daysWorkingMonth = getDaysInMonth();

    const dailyWorkingHoursPerMonth = dailyWorkingHourPerDay * daysWorkingMonth;

    const balance = Number(salaryPerMonth) - Number(expensePerMonth);

    const amounPerHour = balance / dailyWorkingHoursPerMonth;

    return { amounPerHour };
  }

  function handleCalculateGLPPerDay(amounPerHour: number) {
    const { dailyWorkingHour } = formFields;

    const dailyWorkingHourPerDay = Number(dailyWorkingHour.replace(/h/, ""));
    const amountPerDay = amounPerHour * dailyWorkingHourPerDay;

    return { amountPerDay };
  }

  function handleCalculateGLPPerWeek(amounPerDay: number) {
    const daysWorking = 5;

    const amountPerWeek = amounPerDay * daysWorking;

    return { amountPerWeek };
  }

  function handleCalculateGLPPerMonth(amountPerDay: number) {
    const daysWorkingMonth = getDaysInMonth();
    const amountPerMonth = amountPerDay * daysWorkingMonth;

    return { amountPerMonth };
  }

  function handleBack() {
    setBudget(null);
    setIsLoading(false);
    setFormFields(formFieldsInitialState);
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-md sm:mx-auto mx-3 bg-custom-gray-secondary p-6 border border-[#323238] rounded-md">
        {!budget ? (
          <form
            onSubmit={handleSubmitForm}
            className="w-full flex flex-col gap-5"
          >
            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2">
              <Form.Field>
                <Form.Label htmlFor="amount_per_month">Renda mensal</Form.Label>

                <Form.Input
                  type="text"
                  id="amount_per_month"
                  name="salaryPerMonth"
                  value={formFields.salaryPerMonth}
                  onChange={e => handleChangeForm(e)}
                />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="expense_per_month">
                  Gastos mensais
                </Form.Label>

                <Form.Input
                  type="text"
                  id="expense_per_month"
                  name="expensePerMonth"
                  value={formFields.expensePerMonth}
                  onChange={e => handleChangeForm(e)}
                />
              </Form.Field>
            </div>

            <Form.Field>
              <Form.Label>Carga horária diária</Form.Label>

              <div className="flex items-center justify-between ">
                {dailyWorkingHours.map(dailyWorkingHour => (
                  <div
                    key={dailyWorkingHour}
                    className="flex items-center gap-2"
                  >
                    <input
                      value={dailyWorkingHour}
                      type="radio"
                      name="dailyWorkingHour"
                      className="h-4 w-4 accent-purple-700 cursor-pointer"
                      onChange={e => handleChangeForm(e)}
                    />

                    <span className="text-sm">{dailyWorkingHour}</span>
                  </div>
                ))}
              </div>
            </Form.Field>

            <button
              type="submit"
              className="bg-purple-700 w-full h-10 px-2 rounded-md font-bold text-sm hover:bg-purple-800 transition-colors"
            >
              {isLoading ? "Simulando..." : "Simular"}
            </button>
          </form>
        ) : (
          <div>
            <h2 className="text-2xl font-black">Summary</h2>

            <div className="mt-4">
              <div className="flex flex-col gap-3">
                <p>
                  Seu{" "}
                  <abbr
                    title="Ganho líquido por hora"
                    className="font-bold text-purple-600 uppercase underline-offset-2 decoration-solid"
                  >
                    GLPH
                  </abbr>{" "}
                  é {budget.glph}
                </p>

                <p>
                  Seu{" "}
                  <abbr
                    title="Ganho líquido por dia"
                    className="font-bold text-purple-600 uppercase underline-offset-2 decoration-solid"
                  >
                    GLPDia
                  </abbr>{" "}
                  é {budget.amountPerDay}
                </p>

                <p>
                  Seu{" "}
                  <abbr
                    title="Ganho líquido por semana"
                    className="font-bold text-purple-600 uppercase underline-offset-2 decoration-solid"
                  >
                    GLPSemana
                  </abbr>{" "}
                  é {budget.amountPerWeek}
                </p>

                <p>
                  Seu{" "}
                  <abbr
                    title="Ganho líquido por mês"
                    className="font-bold text-purple-600 uppercase underline-offset-2 decoration-solid"
                  >
                    GLPMês
                  </abbr>{" "}
                  é {budget.amountPerMonth}
                </p>
              </div>

              <button
                type="button"
                onClick={handleBack}
                className="mt-4 bg-purple-700 w-full h-10 px-2 rounded-md font-bold text-sm hover:bg-purple-800 transition-colors"
              >
                Voltar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
