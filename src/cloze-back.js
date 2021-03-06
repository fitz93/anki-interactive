(function(){
    let answered = Persistence.getItem('answer') || []; // list of cloze insertions
    answered = answered.map(s => s.stripspaces().trim());

    let the_clozen = clozify(document.querySelector(".my-clozen"));

    let correct = the_clozen.items.map(cloze => cloze.value).map(val => val ? val.splitrim('/') : []);
    let case_sens = answered && answered.filter((e) => e && e.toLowerCase() !== e).length > 0;

    function compare(idx) {
        if( answered.length == 0 ) return 'ground';
        let ans = answered[idx], tru = correct[idx];
        if( !ans ) return 'missed';
        if (!case_sens) {
            ans = ans.toLowerCase();
            tru = tru.map((e) => e.toLowerCase());
        }
        if( tru.indexOf(ans) === -1 ) return 'missed';
        return 'correct';
    }

    the_clozen.items.forEach((cloze, idx) => {
        cloze.classList.add(compare(idx));

        cloze.addEventListener('click', ev => {
            if( cloze.classList.contains('answered') ) {
                cloze.value = correct[idx].join(" / ");
                cloze.classList.remove('answered');
                cloze.classList.add(compare(idx));
            } else if ( answered[idx] ) {
                cloze.value = answered[idx];
                cloze.classList.remove('ground', 'correct', 'missed');
                cloze.classList.add('answered');
            }
        });
    });
})();
