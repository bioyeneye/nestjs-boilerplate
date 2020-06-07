interface Date
{
    getWeekNumber: () => number;
    addSeconds: (seconds: number) => Date;
    addMinutes: (minutes: number) => Date;
    addHours: (hours: number) => Date;
    addDays: (days: number) => Date;
    addWeeks: (weeks: number) => Date;
    addMonths: (months: number) => Date;
    addYears: (years: number) => Date;
}
Date.prototype.addSeconds = function(seconds) {
    this.setSeconds(this.getSeconds() + seconds);
    return this;
};

Date.prototype.addMinutes = function(minutes) {
    this.setMinutes(this.getMinutes() + minutes);
    return this;
};

Date.prototype.addHours = function(hours) {
    this.setHours(this.getHours() + hours);
    return this;
};

Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + days);
    return this;
};

Date.prototype.addWeeks = function(weeks) {
    this.addDays(weeks*7);
    return this;7
};

Date.prototype.addMonths = function (months) {
    const dt = this.getDate();

    this.setMonth(this.getMonth() + months);
    const currDt = this.getDate();

    if (dt !== currDt) {
        this.addDays(-currDt);
    }

    return this;
};

Date.prototype.addYears = function(years) {
    const dt = this.getDate();

    this.setFullYear(this.getFullYear() + years);

    const currDt = this.getDate();

    if (dt !== currDt) {
        this.addDays(-currDt);
    }

    return this;
};
