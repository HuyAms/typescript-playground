// export const programModeEnumMap = {
//     GROUP: "group",
//     ANNOUNCEMENT: "announcement",
//     ONE_ON_ONE: "1on1",
//     SELF_DIRECTED: "selfDirected",
//     PLANNED_ONE_ON_ONE: "planned1on1",
//     PLANNED_SELF_DIRECTED: "plannedSelfDirected",
//   };

export const programModeEnumMap = {
    GROUP: "group",
    ANNOUNCEMENT: "announcement",
    ONE_ON_ONE: "1on1",
    SELF_DIRECTED: "selfDirected",
    PLANNED_ONE_ON_ONE: "planned1on1",
    PLANNED_SELF_DIRECTED: "plannedSelfDirected",
} as const
  
  
  // The problem here is that the below types are all string
  // to solve that, we need to use as const
  // as const freezes the object (same as readonly)
  export type GroupProgram = typeof programModeEnumMap["GROUP"];
  export type AnnouncementProgram = typeof programModeEnumMap["ANNOUNCEMENT"];
  export type OneOnOneProgram = typeof programModeEnumMap["ONE_ON_ONE"];
  export type SelfDirectedProgram = typeof programModeEnumMap["SELF_DIRECTED"];
  export type PlannedOneOnOneProgram =
    typeof programModeEnumMap["PLANNED_ONE_ON_ONE"];
  export type PlannedSelfDirectedProgram =
    typeof programModeEnumMap["PLANNED_SELF_DIRECTED"];