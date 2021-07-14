function sumSpec(a, b) {
    const r = a + b;
    return r
}

test.skip('sumSpec', () => {
    expect(sumSpec(1, 2)).toBe(3);
});