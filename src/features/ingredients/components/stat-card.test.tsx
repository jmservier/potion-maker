import { describe, expect, it } from "@jest/globals";
import { render } from "@testing-library/react";
import { StatCard } from "./stat-card";

describe("StatCard", () => {
  it("should render correctly with sample props", () => {
    const { container } = render(
      <StatCard value={42} label="Total Ingredients" />,
    );

    expect(container).toMatchSnapshot();
  });

  it("should render correctly with string value", () => {
    const { container } = render(
      <StatCard value="100%" label="Success Rate" />,
    );

    expect(container).toMatchSnapshot();
  });
});
