use Data::Dumper;
use URI;
use URI::QueryParam;

my $app = sub {
    my ($env) = @_;
#    warn Dumper $env;

    if ($env->{PATH_INFO} eq '/echo') {
        # URI::QueryParam使って操作する
        my $u = URI->new('',http);
        $u->query($env->{QUERY_STRING});
        my $echo_str = $u->query_param("body")."\n";
        return [200, ['Content-Type' => 'text/plain'], [$echo_str]];
    }
    else {
        return [404, ['Content-Type' => 'text/plain'], ["Page Not Found\n"]];
    }

    return [200, ['Content-Type' => 'text/plain'], ["Default\n"]];
};