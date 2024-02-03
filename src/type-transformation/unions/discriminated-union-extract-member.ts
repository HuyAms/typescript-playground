export type Event =
  | {
      type: "click";
      event: MouseEvent;
    }
  | {
      type: "focus";
      event: FocusEvent;
    }
  | {
      type: "keydown";
      event: KeyboardEvent;
    };


// Extact click event from the discriminated union Event
// hint: use Extract util
type ClickEvent = Extract<Event, {type: "click"}>;

// It can work with unions
type Fruit = "apple" | "banana" | "orange" 

type BananaOrOrangae = Extract<Fruit, "banana" | "orange" >
