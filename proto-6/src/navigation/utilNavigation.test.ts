import utilNavigation from "./utilNavigation";

describe("testing util", () => {
  it("Should return proper result", () => {
    const vsId = [1, 3];
    const vsIdStr = utilNavigation.vsNumberArrToStr(vsId);

    expect(utilNavigation.vsStrToNumberArr(vsIdStr)).toEqual(vsId);
  });
});
