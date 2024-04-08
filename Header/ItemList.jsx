import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

export const ItemList = () => {
  return (
    <div className="flex items-center justify-between">
      <p>Ingredient 1</p>
      <div className="flex items-center gap-2">
        <Button size="icon" variant="outline">
          <MinusIcon className="h-2 w-2" />
          <span className="sr-only">Decrease quantity</span>
        </Button>
        <span>0</span>
        <Button size="icon" variant="outline">
          <PlusIcon className="h-2 w-2" />
          <span className="sr-only">Increase quantity</span>
        </Button>
      </div>
    </div>
  );
};
