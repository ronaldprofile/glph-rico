import * as HoverCard from "@radix-ui/react-hover-card";
import { Question } from "phosphor-react";

export function PreviewContent() {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <div className="cursor-pointer">
          <Question size={24} color="rgb(168, 168, 179)" />
        </div>
      </HoverCard.Trigger>

      <HoverCard.Portal>
        <HoverCard.Content
          className="w-96 p-4 bg-custom-preview-content text-white rounded-md shadow-md"
          side="top"
        >
          <h3 className="text-center font-bold">Base de tudo</h3>

          <div className="mt-3 flex flex-col gap-2 text-justify text-sm text-custom-preview-content-text">
            <p>
              Suponha que você ganhou um total de{" "}
              <span className="font-bold">R$ 3000</span> e gastou{" "}
              <span className="font-bold">R$ 2500</span>, resultando em um saldo
              de <span className="font-bold">R$ 500</span>.
            </p>

            <p>
              Se você trabalhou por 250 horas no mês, podemos calcular o valor
              da sua hora de trabalho dividindo o{" "}
              <span className="underline underline-offset-2 font-bold">
                saldo pelo número de horas trabalhadas no mês
              </span>
              , o que resulta em R$ 2,00 por hora.
            </p>

            <p>
              Esses R$ 2,00 representa o seu{" "}
              <abbr
                title="Ganho líquido por hora"
                className="font-bold text-purple-600 uppercase underline-offset-2 decoration-solid"
              >
                GLPH
              </abbr>
            </p>
          </div>

          <HoverCard.Arrow className="fill-custom-preview-content" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
