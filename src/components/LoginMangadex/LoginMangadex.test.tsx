import {fireEvent} from "@testing-library/react";
import renderer from "react-test-renderer";
import {renderWithProviders} from "../../utils/test-utils";
import LoginMangadex from "./LoginMangadex";

it("logs into mangadex succesfully", () => {
	renderWithProviders(<LoginMangadex/>);
});
