
export const programModeEnumMap = {
    GROUP: "group",
    ANNOUNCEMENT: "announcement",
    ONE_ON_ONE: "1on1",
    SELF_DIRECTED: "selfDirected",
    PLANNED_ONE_ON_ONE: "planned1on1",
    PLANNED_SELF_DIRECTED: "plannedSelfDirected",
  } as const;
  
  // extract object values to a union type
  type ProgramModeEnumMap = typeof programModeEnumMap
  export type IndividualProgram = ProgramModeEnumMap[keyof ProgramModeEnumMap]