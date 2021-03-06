import { createEntityAdapter, EntityState, EntityAdapter } from "@ngrx/entity";
import { User } from "src/app/models/user";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Actions, StudActionTypes } from "../actions/students.actions";

export const studentAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export interface StudentState extends EntityState<User> {
  students: User[];
}
const defaultData = {
  students: null
};
export const initialState: StudentState = studentAdapter.getInitialState(defaultData);

export function studentsReducer(state: StudentState = initialState, action: Actions) {
  switch (action.type) {
    case StudActionTypes.FETCH_SUCCESS: {
      let students = action.payload.sort((a, b) => sortArray(a, b));
      return studentAdapter.addAll(students, state);
    }
    case StudActionTypes.REMOVE_SUCCESS: {
      console.log("Usao sam u reducer za remove");
      return studentAdapter.removeOne(action.payload, state);
    }
    case StudActionTypes.FIND_BEST_SUCCESS: {
      let students = action.payload.sort((a, b) => sortArray(a, b));
      return studentAdapter.addAll(students, state);
    }
    default:
      return state;
  }
}

export const getStudState = createFeatureSelector<StudentState>("students");

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = studentAdapter.getSelectors();

export const selectStudentsAll = selectAll;

export const selectAllStudents = createSelector(
  getStudState,
  selectAll
);

export function sortArray(userA: User, userB: User) {
  var nameA = userA.name.toUpperCase();
  var nameB = userB.name.toUpperCase();

  var surnameA = userA.surname.toUpperCase();
  var surnameB = userB.surname.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  if (surnameA < surnameB) {
    return -1;
  }
  if (surnameA > surnameB) {
    return 1;
  }

  return 0;
}
