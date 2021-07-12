function sumSpec(a, b) {
    const r = a + b;
    return r
}

test('sumSpec', () => {
    expect(sumSpec(1, 2)).toBe(3);
});