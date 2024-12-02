function compareDates(firstDate: Date, seconDate: Date): boolean {
  if (!firstDate || !seconDate) {
    return true;
  }

  return new Date(firstDate).getTime() === new Date(seconDate).getTime();
}

export { compareDates };
